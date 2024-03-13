const projectId = "ztyzupbkbbyqyhjkuauu"; // handle this with env variable

export default function supabaseLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality: number;
  }) {  
  
  return `https://${projectId}.supabase.co/storage/v1/object/public/${src}?width=${width}&quality=${
    quality || 75
  }`;
}
