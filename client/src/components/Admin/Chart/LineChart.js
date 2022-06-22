class Chart {
    createSVGElement(tagName){
        return document.createElementNS('http://www.w3.org/2000/svg', tagName);
    }

    setAttributes($svgElement, attributesObject){
        Object.keys(attributesObject).forEach(key => {
            $svgElement.setAttribute(key, attributesObject[key]);
        })
    }
}

export class LineChart extends Chart {
    circleRadius = 4;
    color = '#000';
    constructor(data, curvPoints, $container, id){
        super();
        this.id = id;
        this.data = data;
        this.curvPoints = curvPoints;
        this.$container = $container;

        this.maxWidth = this.$container.offsetWidth;
        this.maxHeight = this.$container.offsetHeight;
    }

    createChartLine(color) {
        const $chartLine = this.createSVGElement('path');
        this.setAttributes($chartLine, {
            stroke: color ? color : this.color,
            'stroke-width': "2",
            fill: 'none',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        });
        return $chartLine;
    }

    createCircle(el, x, y, isClip = false){
        const $circle = this.createSVGElement('circle');
        let radius = this.circleRadius;
        let color = this.color;
        if(isClip){
            radius += 2;
            color = '#000';
        }else{
            $circle.classList.add('chart-point')
            $circle.dataset.title = el.title;
            $circle.dataset.label = el.label;
            $circle.dataset.value = el.value;
            $circle.dataset.circle = true;
        }
        this.setAttributes($circle, {
            r: radius,
            cx: x,
            cy: y,
            fill: color,
        });
        
        return $circle;
    }

    onCircleOver($circle){
        const $tooltip = document.createElement('div');
        $tooltip.classList.add('tooltip');
        const $title = document.createElement('div'); 
        $title.classList.add('tooltip-title');
        const $content = document.createElement('div'); 
        $content.classList.add('tooltip-content');

        $title.textContent = $circle.dataset.title;
        $content.textContent = $circle.dataset.label + ": " + $circle.dataset.value;
        $tooltip.append($title, $content);

        const cx = $circle.getAttribute('cx');
        const cy = $circle.getAttribute('cy');
        this.$container.appendChild($tooltip);

        $tooltip.style.top = (cy - $tooltip.offsetHeight - 12) + "px";
        $tooltip.style.left = (cx - $tooltip.offsetWidth/2) + "px";

        const $dashedLine = this.createChartLine("white");
        $dashedLine.setAttribute("stroke-dasharray", "3");
        $dashedLine.setAttribute("d", `M ${cx} ${Number(cy) + 6} L ${cx} ${this.maxHeight}`);

        $circle.parentElement.append($dashedLine);


        $circle.onmouseout = () =>{
            $tooltip.remove();
            $dashedLine.remove();
            $circle.onmouseout = null;
        }
    }

    create(){
        const $svg = this.createSVGElement('svg');
        this.setAttributes($svg, {
            width: '100%', 
            height: '100%',
            viewBox: `0 0 ${this.maxWidth} ${this.maxHeight}`
        });

        const $defs = this.createSVGElement('defs');
        const $mask = this.createSVGElement('mask');
        this.setAttributes($mask, {id: `mask${this.id}`});
        const $rect = this.createSVGElement('rect');
        this.setAttributes($rect, {
            x: 0,
            y: 0,
            width: '100%',
            height: '100%',
            fill: 'white'
        });
        $mask.appendChild($rect);
        $defs.appendChild($mask);

        const $chartLine = this.createChartLine();
        $svg.append($defs, $chartLine);

        let d = 'M ';
        this.data.forEach((el, i) => {
            const x = el.x;
            const y = this.maxHeight - el.y;
            if(el.title){
                const $circle = this.createCircle(el, x, y);
                const $maskCircle = this.createCircle(el, x, y, true);
                $mask.append($maskCircle);
                $svg.append($circle);
            }
        });
        this.curvPoints.forEach((el, i) =>{
            if(i % 2 == 1){
                const y = this.maxHeight - el;
                d += `${y} L `;
            }else{
                let x = el;
                if(i === 0)
                    x++;
                else if(i === this.curvPoints.length - 2)
                    x--;
                d += `${x} `;
            }
        }); 
        d = d.slice(0, -3);
        this.setAttributes($chartLine, {
            d: d,
            'mask': `url(#${$mask.id})`
        })
        // $chartLine.setAttribute('d', d)
        this.$container.innerHTML = '';
        this.$container.appendChild($svg);

        $svg.onmouseover = (e) => {
            if(e.target.dataset.circle){
                this.onCircleOver(e.target)
            }
        }
    }
};
