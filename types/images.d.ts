
declare module '*.png' {
    const content: ImageURISource ;
    export default content;
}
declare module '*.jpg' {
    const content: ImageURISource;
    export default content;
}

declare module '*.ttf' {
    const content: string;
    export default content;
}
