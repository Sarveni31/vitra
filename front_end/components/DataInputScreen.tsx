import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, Save, Plus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Badge } from './ui/badge';

export function DataInputScreen() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [formData, setFormData] = useState({
    hemoglobin: '',
    ferritin: '',
    liverEnzymes: {
      alt: '',
      ast: '',
      alp: '',
    },
    dietLog: '',
    symptoms: '',
    medication: '',
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save functionality
    toast.success('Health data saved successfully!');
    console.log('Form data:', { ...formData, date: selectedDate });
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const recentEntries = [
    { date: '2025-06-03', hemoglobin: '8.3', ferritin: '2520', type: 'Blood Test' },
    { date: '2025-05-06', hemoglobin: '7.8', ferritin: '2380', type: 'Routine Check' },
    { date: '2025-04-08', hemoglobin: '8.1', ferritin: '2450', type: 'Pre-Transfusion' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1>Add Health Data</h1>
        <p className="text-muted-foreground">Enter your latest test results and health information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Test Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      {selectedDate ? formatDate(selectedDate) : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {/* Blood Parameters */}
            <Card>
              <CardHeader>
                <CardTitle>Blood Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hemoglobin">Hemoglobin (g/dL)</Label>
                    <Input
                      id="hemoglobin"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 8.3"
                      value={formData.hemoglobin}
                      onChange={(e) => handleInputChange('hemoglobin', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Normal: 12-16 g/dL</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ferritin">Serum Ferritin (ng/mL)</Label>
                    <Input
                      id="ferritin"
                      type="number"
                      placeholder="e.g., 2520"
                      value={formData.ferritin}
                      onChange={(e) => handleInputChange('ferritin', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Normal: 15-300 ng/mL</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liver Enzymes */}
            <Card>
              <CardHeader>
                <CardTitle>Liver Function Tests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="alt">ALT (U/L)</Label>
                    <Input
                      id="alt"
                      type="number"
                      placeholder="e.g., 45"
                      value={formData.liverEnzymes.alt}
                      onChange={(e) => handleInputChange('liverEnzymes.alt', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Normal: 7-56 U/L</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ast">AST (U/L)</Label>
                    <Input
                      id="ast"
                      type="number"
                      placeholder="e.g., 38"
                      value={formData.liverEnzymes.ast}
                      onChange={(e) => handleInputChange('liverEnzymes.ast', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Normal: 10-40 U/L</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="alp">ALP (U/L)</Label>
                    <Input
                      id="alp"
                      type="number"
                      placeholder="e.g., 120"
                      value={formData.liverEnzymes.alp}
                      onChange={(e) => handleInputChange('liverEnzymes.alp', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Normal: 44-147 U/L</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms & Notes</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Any symptoms, side effects, or observations..."
                    value={formData.symptoms}
                    onChange={(e) => handleInputChange('symptoms', e.target.value)}
                    className="min-h-20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="medication">Current Medication</Label>
                  <Input
                    id="medication"
                    placeholder="e.g., Deferasirox 500mg daily"
                    value={formData.medication}
                    onChange={(e) => handleInputChange('medication', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Diet Log */}
            <Card>
              <CardHeader>
                <CardTitle>Diet Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="diet">Today's Meals &amp; Iron Intake</Label>
                  <Textarea
                    id="diet"
                    placeholder="Breakfast: Cereal with vitamin C&#10;Lunch: Grilled chicken, vegetables&#10;Dinner: Fish with rice&#10;&#10;Iron chelation timing: 2 hours after dinner"
                    value={formData.dietLog}
                    onChange={(e) => handleInputChange('dietLog', e.target.value)}
                    className="min-h-24"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button type="submit" className="w-full flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Health Data
            </Button>
          </form>
        </div>

        {/* Recent Entries Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 Take chelation medication on an empty stomach for better absorption
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  🥗 Avoid vitamin C supplements near iron chelation time
                </p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  📊 Regular monitoring helps optimize treatment
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentEntries.map((entry, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs">
                        {entry.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatShortDate(entry.date)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Hb:</span> {entry.hemoglobin} g/dL
                      </div>
                      <div>
                        <span className="text-muted-foreground">Ferritin:</span> {entry.ferritin}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}