import layersImage from '../assets/layers.png';
import broilersImage from '../assets/broiler.png';
import hybridImage from '../assets/hybrid.png';

const birdImages = {
  Layers: layersImage,
  Broilers: broilersImage,
  Hybrid: hybridImage,
};
const BirdImage = ({ chickenType }) => {
  const imageSrc = birdImages[chickenType] || null;

  return (
    <div className="flex justify-center my-4">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={`${chickenType} chicken`}
          className="w-64 h-64 object-cover rounded-lg shadow-md"
        />
      ) : (
        <p className="text-gray-500">Select a chicken type to see the image.</p>
      )}
    </div>
  );
};

export default BirdImage;

