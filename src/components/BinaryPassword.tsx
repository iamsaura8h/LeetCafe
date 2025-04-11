
import React, { useState, useEffect } from 'react';
import { Copy, Check, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

interface BinaryPasswordProps {
  word: string;
  className?: string;
}

const BinaryPassword: React.FC<BinaryPasswordProps> = ({ word, className }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [binaryString, setBinaryString] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    const toBinary = (str: string) => {
      return str.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
      }).join(' ');
    };
    
    setBinaryString(toBinary(word));
  }, [word]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(binaryString);
    setIsCopied(true);
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const truncatedBinary = binaryString.length > 20 
    ? binaryString.substring(0, 20) + '...' 
    : binaryString;
  
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <code 
              className={cn(
                "font-mono text-xs sm:text-sm bg-secondary px-2 py-1 rounded cursor-pointer transition-all duration-300",
                isExpanded ? "max-w-none" : "truncate max-w-[100px] sm:max-w-[150px]"
              )}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? binaryString : truncatedBinary}
            </code>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isExpanded ? "Click to collapse" : "Click to expand"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <div className="flex gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 hover:scale-110 transition-transform" 
          onClick={() => setIsExpanded(!isExpanded)} 
          title={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <EyeOff className="h-3 w-3" />
          ) : (
            <Eye className="h-3 w-3" />
          )}
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 hover:scale-110 transition-transform" 
          onClick={handleCopy} 
          title={isCopied ? "Copied!" : "Copy"}
        >
          {isCopied ? (
            <Check className="h-3 w-3 text-code-green" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default BinaryPassword;
