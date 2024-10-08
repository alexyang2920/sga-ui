import { Text } from "@mantine/core";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { useMemo, useState } from "react";

interface ContentEditorWrapperProps {
    fieldName: string;
    fieldLabel: string;
    initContent?: string | null;
    onContentUpdate: (field: string) => (content: string) => void;
}

export function ContentEditorWrapper({ fieldName, fieldLabel , initContent, onContentUpdate }: ContentEditorWrapperProps ) {
    const [content, _] = useState<string | undefined | null>(initContent);
    const body = useMemo(() => {
        return (
            <ContentEditor
                key={fieldName}
                label={fieldLabel}
                initContent={content ?? ''}
                onContentUpdate={onContentUpdate(fieldName)}
            />
        )
    }, [fieldName, fieldLabel]);
    return (
        <>
            {body}
        </>
    );
}


interface ContentEditorProps {
    label: string;
    initContent?: string;
    onContentUpdate: (content: string) => void;
}

function ContentEditor({
    label,
    onContentUpdate,
    initContent
}: ContentEditorProps) {
    // Make sure editor can only initialized for the first time it rendered.
    const [initialEditorContent, _] = useState<string | null | undefined>(
        initContent
    );

    const editor = useEditor(
        {
            extensions: [
                StarterKit,
                Underline,
                Link,
                Superscript,
                SubScript,
                Highlight,
                TextAlign.configure({ types: ["heading", "paragraph"] })
            ],
            content: initialEditorContent,
            onUpdate(props) {
                onContentUpdate(props.editor.getHTML());
            }
        },
        [onContentUpdate, initialEditorContent]
    );

    return (
        <>
            <Text mt="md">{label}</Text>
            <RichTextEditor editor={editor} mih="240px">
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
            </RichTextEditor>
        </>
    );
}
