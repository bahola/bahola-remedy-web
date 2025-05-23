
import React, { useEffect, useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchAndFilterBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit?: (e: React.FormEvent) => void;
  onClearSearch?: () => void;
  liveDebouncedSearch?: boolean;
}

const SearchAndFilterBar = ({ 
  searchTerm, 
  onSearchChange,
  onSearchSubmit,
  onClearSearch,
  liveDebouncedSearch = true
}: SearchAndFilterBarProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  
  // Sync with parent state
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);
  
  // Debounce search if live search is enabled
  useEffect(() => {
    if (!liveDebouncedSearch) return;
    
    const timer = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        const event = {
          target: { value: localSearchTerm }
        } as React.ChangeEvent<HTMLInputElement>;
        onSearchChange(event);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [localSearchTerm, searchTerm, onSearchChange, liveDebouncedSearch]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(e);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
    
    // If live search is not enabled, pass changes directly to parent
    if (!liveDebouncedSearch) {
      onSearchChange(e);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <form className="relative flex-1" onSubmit={handleSubmit}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search products..." 
          className="pl-10 pr-8"
          value={localSearchTerm}
          onChange={handleInputChange}
        />
        {localSearchTerm && onClearSearch && (
          <Button 
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
            onClick={() => {
              setLocalSearchTerm('');
              onClearSearch();
            }}
          >
            <X size={16} />
          </Button>
        )}
      </form>
      <Button variant="outline">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
    </div>
  );
};

export default SearchAndFilterBar;
