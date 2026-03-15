declare module "page-flip" {
  export type FlipCorner = "top" | "bottom";
  export type FlipDirection = "forward" | "back";

  export interface PageFlipOptions {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    startPage?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
  }

  export interface FlipEvent {
    data: number;
  }

  export class PageFlip {
    constructor(element: HTMLElement, options: PageFlipOptions);
    loadFromHTML(items: NodeListOf<Element> | HTMLElement[]): void;
    flipNext(corner?: FlipCorner): void;
    flipPrev(corner?: FlipCorner): void;
    turnToPage(index: number): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    destroy(): void;
    on(event: "flip" | "changeOrientation" | "changeState", cb: (e: FlipEvent) => void): this;
  }
}
