
import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface BinaryPasswordProps {
  word: string;
  className?: string;
}

const BinaryPassword: React.FC<BinaryPasswordProps> = ({ word, className }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [binaryString, setBinaryString] = useState('');
  
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
  
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <code className="font-mono text-xs sm:text-sm bg-secondary px-2 py-1 rounded truncate max-w-[150px] sm:max-w-none">
        {binaryString}
      </code>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6" 
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
  );
};

export default BinaryPassword;
