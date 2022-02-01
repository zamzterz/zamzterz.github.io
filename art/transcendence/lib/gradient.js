export default class LinearGradient {
    constructor(direction='vertical', ...colors) {
        this.direction = direction;
        this.colors = colors;

        this.width = null;
        this.height = null;
        this.gradient = null;
    }

    getGradient(ctx, chartArea) {
        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;
        if (this.gradient === null || this.width !== chartWidth || this.height !== chartHeight) {
            // Create the gradient because this is either the first render
            // or the size of the chart has changed
            this.width = chartWidth;
            this.height = chartHeight;

            if (this.direction === 'horizontal') {
                this.gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
            } else {
                // default: vertical, bottom to top
                this.gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            }

            this.colors.forEach((color, i) => {
                this.gradient.addColorStop(i / (this.colors.length - 1), color);
            });
        }

        return this.gradient;
    }
}

export function chartJSgradient(direction, ...colors) {
    const g = new LinearGradient(direction, ...colors);

    return (context) => {
        const chart = context.chart;
        const {ctx, chartArea} = chart;

        if (!chartArea) {
            // This case happens on initial chart load
            return null;
        }
        return g.getGradient(ctx, chartArea);
    };
};
