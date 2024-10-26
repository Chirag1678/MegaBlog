import {Editor} from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
export default function RTE({name,control,label,defaultValue=""}) {
  return (
    // <Editor
    // initialValue='default value'
    // init={{
    //     branding:false,
    //     height:500,
    //     menubar:true,
    //     plugins:['lists','table','link','image','charmap','anchor','autolink','searchreplace','visualblocks','code','fullscreen','insertdatetime','media','wordcount'],
    //     toolbar:'undo redo | blocks fontsize | bold italic underline strikethrough | link image | alignbullist numlist | indent outdent | emoticons charmap | removeformat',
    //     content_style:'body{font-family:Helvetica,Arial,sans-serif;font-size:14px}',
    // }}
    // />
    <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
        <Controller
        name={name||"content"}
        control={control}
        render={({field: {onChange}})=>(
            <Editor
            initialValue={defaultValue}
            init={{
                initialValue:defaultValue,
                height:500,
                menubar:true,
                plugins:['image','advlist','autolink','lists','link','charmap','preview','anchor','searchreplace','visualblocks','code','fullscreen','insertdatetime','media','wordcount','table','help',],
                toolbar:'undo redo | blocks fontsize | bold italic underline strikethrough | link image | bullist numlist | indent outdent | emoticons charmap | removeformat | formatselect | alignleft aligncenter alignright alignjustify | help',
                content_style:'body{font-family:Helvetica,Arial,sans-serif;font-size:14px}',
            }}
            onEditorChange={onChange}
            />
        )}
        />
    </div>
  )
}