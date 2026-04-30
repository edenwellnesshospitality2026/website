
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DatePickerComponentProps {
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
  title?: string;
  placeholder?: string;
}

const DatePickerComponent = ({ 
  onDateSelect, 
  selectedDate, 
  title = "Select Date",
  placeholder = "Choose your date"
}: DatePickerComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateSelect(date);
      setIsOpen(false);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-stone-200 mb-8">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-stone-800 mb-4">{title}</h3>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal border-stone-300 rounded-xl py-6",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-5 w-5" />
              {selectedDate ? format(selectedDate, "PPP") : <span>{placeholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date()}
              initialFocus
              weekStartsOn={0}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
};

export default DatePickerComponent;
