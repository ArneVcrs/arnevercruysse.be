import config from '../../config.json';

interface ThumbnailProps {
    name: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
}

export const Thumbnail = ({
    name,
    alt,
    className = '', 
    width = 640, 
    height  
}: ThumbnailProps) => {
    const base: string = config.imagesBaseUrl;

    return (
        <picture>
            <source srcSet={`${base}/${name}_640.webp`} type="image/webp" />
            <img 
                src={`${base}/${name}_640.jpg`} 
                alt={alt}
                width={width}
                height={height}
                loading="lazy"
                className={`block max-w-full h-auto ${className}`} 
            />
        </picture>
    );
};