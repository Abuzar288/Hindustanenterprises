
import React from 'react';
import { ContentItem } from './types';

interface ContentCardProps {
  item: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg"
      aria-labelledby={`content-title-${item.id}`}
    >
      {item.imageUrl && (
        <div className="w-full h-48">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover" 
          />
        </div>
      )}
      <div className="p-5 flex-grow flex flex-col">
        <span className="text-xs text-teal-600 font-semibold uppercase tracking-wider mb-1">
          {item.type}
        </span>
        <h3 id={`content-title-${item.id}`} className="text-lg font-semibold text-gray-800 mb-2" title={item.title}>
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 flex-grow">
          {item.snippet}
        </p>
        <div className="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-200">
          <span>Published on: {formatDate(item.publishDate)}</span>
          {item.author && <span className="ml-2">by {item.author}</span>}
        </div>
        <a 
          href={`#content/${item.id}`} // Placeholder link
          className="mt-3 text-sm text-amber-600 hover:text-amber-700 hover:underline font-semibold self-start"
          aria-label={`Read more about ${item.title}`}
        >
          Read More &rarr;
        </a>
      </div>
    </div>
  );
};

export default ContentCard;
