import Page from '@/pages/(events-manage)/events/[id]/view/calendar/page'

export default function EventViewCalendarPage() {
  return <Page talks={talks} locationList={locationList} />
}
const locationList = ['Room A', 'Room B', 'Room C']
const talks = [
  {
    id: '8c0d5b99-f78d-4f7a-b9c9-deab4e700f35',
    title: 'Quimica aplicada 2',
    abstract: 'Aplicacion de quimica aplicada.',
    location: 'Room A',
    date: '2024-09-09T01:01:01',
    authors: [{ full_name: 'Mateo Capon' }],
  },
  {
    id: '7b1a3c88-e56d-4f2a-8b9a-cdef1234abcd',
    title: 'Machine Learning in Bioinformatics',
    abstract: 'Exploring the applications of ML in genomic data analysis.',
    location: 'Room B',
    date: '2024-09-10T14:30:00',
    authors: [{ full_name: 'Sarah Johnson' }],
  },
  {
    id: '6c2b4d99-a45e-3f1b-7c8d-efgh5678ijkl',
    title: 'Sustainable Energy Solutions',
    abstract: 'Innovative approaches to renewable energy technologies.',
    location: 'Room A',
    date: '2024-09-11T10:15:00',
    authors: [{ full_name: 'Alex Chen' }],
  },
  {
    id: '5d3c5e00-b56f-2g3c-6d7e-mnop9012qrst',
    title: 'Quantum Computing: Current State and Future Prospects',
    abstract: 'An overview of recent advancements in quantum computing.',
    location: 'Room C',
    date: '2024-09-12T09:45:00',
    authors: [{ full_name: 'Emily Nakamura' }],
  },
]
