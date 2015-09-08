// Type definitions for chokidar 1.0.0
// Project: https://github.com/paulmillr/chokidar
// Definitions by: Stefan Steinhart <https://github.com/reppners/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../node/node.d.ts" />

declare module "fs"
{
    interface FSWatcher
    {
        add(fileDirOrGlob:string):void;
        add(filesDirsOrGlobs:Array<string>):void;
        unwatch(fileDirOrGlob:string):void;
        unwatch(filesDirsOrGlobs:Array<string>):void;
    }
}

declare module "chokidar"
{
    interface WatchOptions
    {
        persistent?:boolean;
        ignored?:any;
        ignoreInitial?:boolean;
        followSymlinks?:boolean;
        cwd?:string;
        usePolling?:boolean;
        useFsEvents?:boolean;
        alwaysStat?:boolean;
        depth?:number;
        interval?:number;
        binaryInterval?:number;
        ignorePermissionErrors?:boolean;
        atomic?:boolean;
    }

    import fs = require("fs");

    function watch( fileDirOrGlob:string, options?:WatchOptions ):fs.FSWatcher;
    function watch( filesDirsOrGlobs:Array<string>, options?:WatchOptions ):fs.FSWatcher;
}

// Type definitions for iScroll 4.2
// Project: http://cubiq.org/iscroll-4
// Definitions by: Boris Yankov <https://github.com/borisyankov/>, Christiaan Rakowski <https://github.com/csrakowski/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


interface iScrollEvent {
    (e: Event): void;
}

interface iScrollOptions {
    hScroll?: boolean;
    vScroll?: boolean;
    x?: number;
    y?: number;
    bounce?: boolean;
    bounceLock?: boolean;
    momentum?: boolean;
    lockDirection?: boolean;
    useTransform?: boolean;
    useTransition?: boolean;
    topOffset?: number;
    checkDOMChanges?: boolean;
    handleClick?: boolean;

    // Scrollbar
    hScrollbar?: boolean;
    vScrollbar?: boolean;
    fixedScrollbar?: boolean;
    hideScrollbar?: boolean;
    fadeScrollbar?: boolean;
    scrollbarClass?: string;

    // Zoom
    zoom?: boolean;
    zoomMin?: number;
    zoomMax?: number;
    doubleTapZoom?: number;
    wheelAction?: string;

    // Snap
    snap?: any;
    snapThreshold?: number;

    // Events
    onRefresh?: iScrollEvent;
    onBeforeScrollStart?: iScrollEvent;
    onScrollStart?: iScrollEvent;
    onBeforeScrollMove?: iScrollEvent;
    onScrollMove?: iScrollEvent;
    onBeforeScrollEnd?: iScrollEvent;
    onScrollEnd?: iScrollEvent;
    onTouchEnd?: iScrollEvent;
    onDestroy?: iScrollEvent;
    onZoomStart?: iScrollEvent;
    onZoom?: iScrollEvent;
    onZoomEnd?: iScrollEvent;
}

declare class iScroll {

    constructor (element: string, options?: iScrollOptions);
    constructor (element: HTMLElement, options?: iScrollOptions);

    destroy(): void;
    refresh(): void;
    scrollTo(x: number, y: number, time?: number, relative?: boolean): void;
    scrollToElement(element: string, time?: number): void;
    scrollToElement(element: HTMLElement, time?: number): void;
    scrollToPage(pageX: number, pageY: number, time?: number): void;
    disable(): void;
    enable(): void;
    stop(): void;
    zoom(x: number, y: number, scale: number, time?: number): void;
    isReady(): boolean;
}