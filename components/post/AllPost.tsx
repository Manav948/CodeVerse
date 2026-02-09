import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loader from '../ui/Loading'
import Post from './Post'

const AllPost = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const res = await axios.get("/api/post/getAll")
      return res.data;
    }
  })
  if (isLoading) {
    return (
      <div className="py-20 text-center text-white/50">
        <Loader />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="py-20 text-center text-white/50">
        No Post found
      </div>
    );
  }
  return (
    <div>
      {data.map((post : any) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default AllPost
