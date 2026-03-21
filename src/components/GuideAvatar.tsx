interface GuideAvatarProps {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
};

export default function GuideAvatar({ src, alt = "Guide", size = "sm" }: GuideAvatarProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${sizeClasses[size]}`}>
      <img src={src} alt={alt} className="w-full h-full object-contain relative z-10" />
    </div>
  );
}
