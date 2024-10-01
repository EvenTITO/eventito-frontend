import Loader from './Loader'

export default function FetchStatus({ isPending, error, component }) {
  if (isPending) {
    return <Loader showMessage={true} />
  } else if (error) {
    console.log(error)
    return (
      <div className="min-h-screen w-full items-center">Ocurrio un error</div>
    )
  } else {
    return <>{component}</>
  }
}
