import { Skeleton } from "./ui/skeleton"


const SkeletonLoading = ({className}) => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className={className} />
    </div>
  )
}

export default SkeletonLoading