import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Questions from '@/pages/Questions';
import Timeline from '@/pages/Timeline';
import Photos from '@/pages/Photos';
import Album from '@/pages/Album';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/album" element={<Album />} />
      </Routes>
    </Router>
  );
}
