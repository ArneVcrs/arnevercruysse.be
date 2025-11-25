import config from '../../config.json';

interface ImageProps {
    name: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
}

export const Image = ({
    name,
    alt,
    className = '', 
    width, 
    height  
}: ImageProps) => {
    const base: string = config.imagesBaseUrl;

    return (
        <picture>
            <source 
                srcSet={`${base}/${name}_1280.webp 1280w, ${base}/${name}_2880.webp 2880w`} 
                type="image/webp" 
            />
            <img 
                src={`${base}/${name}_1280.jpg`} 
                alt={alt}
                width={width}
                height={height}
                className={`block max-w-full h-auto ${className}`} 
            />
        </picture>
    );
};