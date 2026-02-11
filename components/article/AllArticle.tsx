import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loader from '../ui/Loading'
import Article from './Article'


const AllArticle = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["article"],
    queryFn: async () => {
      const res = await axios.get("/api/article/get")
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
        No Article found
      </div>
    );
  }
  return (
    <div>
      {data.map((article : any) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  )
}

export default AllArticle
