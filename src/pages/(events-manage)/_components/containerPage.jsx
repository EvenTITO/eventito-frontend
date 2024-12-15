import ScrollToTop from "@/components/ScrollToTop";

export default function ContainerPage({ children }) {
  return (
    <div className="container mx-auto py-8">
      <ScrollToTop />
      {children}
    </div>
  )
}
