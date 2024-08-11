interface RichTextDisplayProps {
    content: string;
}

export const RichTextDisplay = ({ content }: RichTextDisplayProps) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
};
