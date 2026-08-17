import photo1 from '../assets/photo1.jpg';

export default function PhotoBackground() {
  return (
    <div className="photo-bg">
      <img src={photo1} alt="" aria-hidden="true" />
    </div>
  );
}
