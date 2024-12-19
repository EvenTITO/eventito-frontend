import ScrollToTop from '@/components/ScrollToTop'

export default function ContainerPage({ children, goToTop = true }) {
  return (
    <div className="container mx-auto py-8">
      {goToTop && <ScrollToTop />}
      {children}
    </div>
  )
}
