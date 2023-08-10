import React from "react";

export type MarkdownContextType = {
    markdownStatement: string;
    setMarkdownStatement: (markdownStatement: string) => void;
    clueCheck: boolean;
    setMarkdownClueCheck: (clueCheck: boolean) => void;
    markdownClue?: string;
    setMarkdownClue: (markdownClue: string) => void;
    markdownShow: string; 
    setMarkdownShow: (markdownShow: string) => void;
    urlImage?:string;
};

const defaultMarkdownContext = {
  markdownStatement: "",
  setMarkdownStatement: () => {},
  clueCheck: false,
  setMarkdownClueCheck: () => {},
  markdownClue: "",
  setMarkdownClue: () => {},
  markdownShow: "", 
  setMarkdownShow: () => {},
  urlImage:""
};
export const MarkdownContext = React.createContext<MarkdownContextType>(defaultMarkdownContext);