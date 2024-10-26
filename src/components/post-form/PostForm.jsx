import { isValidElement, useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import {Button,Input,Select,RTE} from '../index'
import service from '../../appwrite/config'
import { useNavigate } from "react-router-dom" 
import { useSelector } from "react-redux"

function PostForm({post}) {
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
        defaultValues:{
            title:post?.title||"",
            slug:post?.slug||"",
            content:post?.content||"",
            status:post?.status||"active",
        },
    });
    const navigate=useNavigate();
    const {userData}=useSelector((state)=>state.user);
    const submit=async (data)=>{
        if(post){
            const file=data.image[0]? service.uploadFile(data.image[0]):null;
            if(file){
                service.deleteFile(post.featuredImage);
            }
            const dbPost=await service.updatePost(post.$id,{
                ...data,
                featuredImage:file?file.$id:undefined,
            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else{
            const file=data.image[0]? service.uploadFile(data.image[0]):null;
            if(file){
                const fileId=file.$id;
                data.featuredImage=fileId;
                const newPost=await service.createPost({
                    ...data,
                    userId:userData.$id,
                })
                if(newPost){
                    navigate(`/post/${newPost.$id}`);
                }
            }
        }
    }
    const slugTransform=useCallback((value)=>{
        if(value && typeof value==="string") return value.trim().toLowerCase().replace(/^[a-zA-Z\d\s]+/g,'-').replace(/\s/g,'-')
        return "";
    },[])
    useEffect(() => {
        const subscription=watch((value,{name})=>{
            if(name && name==="title"){
                setValue("slug",slugTransform(value.title,{isValidElement:true}))
            }
        })

        return ()=>subscription.unsubscribe(); //cleanup function, to prevent memory leak
    },[watch,slugTransform,setValue])
    
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input 
                label="Title: " 
                placeholder="Title" 
                className="mb-4" 
                {...register("title", {required: true})}
            />
            <Input 
                label="Slug: " 
                placeholder="Slug" 
                className="mb-4" 
                {...register("slug", {required: true})}
            />
            <RTE 
                label="Content: " 
                placeholder="Content" 
                control={control}
                defaultValue={getValues("content")}
            />
        </div>
        <div className="w-1/3 px-2">
        <Input label="Featured Image: " type="file" className="mb-4" accept="image/*" {...register("image",{required:!post})}/>
        {post && (
            <div className="w-full mb-4">
                <img src={service.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-lg"/>
            </div>
        )}
        <Select label="Status: " options={['active','inactive']} {...register("status",{required:true})} className="mb-4"/>
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">{post?"Update":"Publish"}</Button>
        </div>
    </form>
    )
}

export default PostForm
