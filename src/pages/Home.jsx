import { useState, useEffect } from "react"
import service from "../appwrite/config"
import { Container, PostCard } from "../components"
const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts().then((posts) => {
      if(posts){
        setPosts(posts.documents);
      }
    });
  }, []);
  if(posts.length === 0){
    return(
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">Login to see posts</h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
