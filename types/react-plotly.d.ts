declare module 'react-plotly.js' {
    import * as React from 'react';

    interface PlotParams {
        data?: Array<any>;
        layout?: any;
        config?: any;
        frames?: Array<any>;
        style?: React.CSSProperties;
        useResizeHandler?: boolean;
        debug?: boolean;
        onInitialized?: (figure: any, graphDiv: any) => void;
        onUpdate?: (figure: any, graphDiv: any) => void;
        onPurge?: (figure: any, graphDiv: any) => void;
        onError?: (err: Error) => void;
        onAfterExport?: (figure: any, graphDiv: any) => void;
        onAfterPlot?: (figure: any, graphDiv: any) => void;
        onAnimated?: (figure: any, graphDiv: any, animationOpts: any) => void;
        onAnimatingFrame?: (figure: any, graphDiv: any, frameIndex: number, frameData: any) => void;
        onAnimationInterrupted?: (figure: any, graphDiv: any) => void;
        onAutoSize?: (figure: any, graphDiv: any) => void;
        onBeforeExport?: (figure: any, graphDiv: any) => void;
        onBeforeHover?: (figure: any, graphDiv: any, evt: any) => void | false;
        onButtonClicked?: (figure: any, graphDiv: any, evt: any) => void;
        onClick?: (figure: any, graphDiv: any, evt: any) => void;
        onClickAnnotation?: (figure: any, graphDiv: any, evt: any) => void;
        onDeselect?: (figure: any, graphDiv: any) => void;
        onDoubleClick?: (figure: any, graphDiv: any, evt: any) => void;
        onFramework?: (figure: any, graphDiv: any) => void;
        onHover?: (figure: any, graphDiv: any, evt: any) => void;
        onLegendClick?: (figure: any, graphDiv: any, evt: any) => void | false;
        onLegendDoubleClick?: (figure: any, graphDiv: any, evt: any) => void | false;
        onRelayout?: (figure: any, graphDiv: any) => void;
        onRestyle?: (figure: any, graphDiv: any) => void;
        onRedraw?: (figure: any, graphDiv: any) => void;
        onSelected?: (figure: any, graphDiv: any, evt: any) => void;
        onSelecting?: (figure: any, graphDiv: any, evt: any) => void;
        onSliderChange?: (figure: any, graphDiv: any, step: any) => void;
        onSliderEnd?: (figure: any, graphDiv: any, step: any) => void;
        onSliderStart?: (figure: any, graphDiv: any, step: any) => void;
        onTransitioning?: (figure: any, graphDiv: any) => void;
        onTransitionInterrupted?: (figure: any, graphDiv: any) => void;
        onUnhover?: (figure: any, graphDiv: any, evt: any) => void;
        [key: string]: any;
    }

    const Plot: React.ComponentType<PlotParams>;

    export default Plot;
} 