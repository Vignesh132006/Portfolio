import VideoIntro from '../components/VideoIntro';
import About from '../components/About';

export default function Home() {
  return (
    <main>
      <VideoIntro videoSrc="/hero-video.mp4" />
      <About />
    </main>
  );
}
