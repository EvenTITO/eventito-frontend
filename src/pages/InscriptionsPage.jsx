import { Link } from "react-router-dom";
import HomeNav from "../components/HomeNav";

export default function InscriptionsPage() {
  const RenderPayment = ({ paymentStatus }) => {
    if (paymentStatus === 'COMPLETED') {
      return (
        <div className="p-1 bg-green-100 rounded my-2" style={{ display: 'inline-block' }}>
          Pago completado
        </div>
      );
    } else if (paymentStatus === 'PROCESSING') {
      return (
        <div className="p-1 bg-gray-100 rounded my-2" style={{ display: 'inline-block' }}>
          Procesando pago
        </div>
      );
    } else {
      return (
        <div className="p-1 bg-red-100 rounded my-2" style={{ display: 'inline-block' }}>
          Pago pendiente
        </div>
      );
    }
  }


  return (
    <>
      <HomeNav />
      <div className="flex items-center justify-around">
        <div className="divide-y divide-gray-200 w-full max-w-4xl mx-auto">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
              Mis inscripciones
            </h1>
          </div>
          <ul className="divide-y divide-gray-200">
            {!posts.length && 'No posts found.'}
            {posts.map((post) => {
              return (
                <li key={post._id} className="py-12">
                  <article>
                    <div className="gap-10 space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <div>
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500">
                            {post.date}
                          </dd>
                        </dl>
                        <RenderPayment paymentStatus={post.payment} />
                      </div>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                to={'/events/' + post._id}
                                href={`/blog/${post._id}`}
                              >
                                {post.title}
                              </Link>
                            </h2>
                          </div>
                          <div className="prose max-w-none text-gray-500">
                            {post.summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            to={'/events/' + post._id}
                            className="text-primary-500 hover:text-blue-700"
                            aria-label={`Read "${post.title}"`}
                          >
                            Ir al evento &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  );
}


const posts = [
  {
    _id: 1234,
    photos: ["https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"],
    title: 'Generating Structured Output from LLMs',
    date: '08/08/2024',
    author: 'Pedro Pedrito',
    summary: 'A survey on the different methodologies used to generate structured output from LLMs, from model fine-tuning, to domain specific language, and schema engineering.',
    payment: 'COMPLETED',
  }, {
    _id: 1235,
    photos: ["https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"],
    title: 'Streamlining Citations in Markdown - Cite Faster and Smarter',
    date: '12/08/2024',
    author: 'Pedro Pedrito',
    summary: 'The art and craft of automating citations beyond the mountain of domain specific intricacies and regex. Rehype Citation is a plugin that allows citations and bibliography to be easily inserted from local and remote sources.',
    payment: 'PROCESSING'
  }, {
    _id: 1236,
    photos: ["https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg?auto=compress&cs=tinysrgb&h=350"],
    title: 'Advanced Techniques in Data Augmentation for Machine Learning',
    date: '05/09/2024',
    author: 'Maria Martinez',
    summary: 'Exploring advanced techniques in data augmentation to improve machine learning model performance, including GANs, SMOTE, and feature engineering.',
    payment: 'INCOMPLETED'
  }];


