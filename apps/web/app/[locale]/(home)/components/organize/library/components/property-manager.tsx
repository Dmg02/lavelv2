'use client';

import { Button } from '@repo/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/design-system/components/ui/dialog';
import { Input } from '@repo/design-system/components/ui/input';
import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/design-system/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/design-system/components/ui/tabs';
import { Edit2, Plus, Settings2, X } from 'lucide-react';
import { useState } from 'react';
import type { CustomProperty, LibraryFile } from '@/types/library';

interface PropertyManagerProps {
  file: LibraryFile;
  onUpdate: (updates: Partial<LibraryFile>) => void;
}

const colorOptions = [
  { label: 'Red', value: '#ef4444' },
  { label: 'Orange', value: '#f97316' },
  { label: 'Green', value: '#22c55e' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Purple', value: '#a855f7' },
  { label: 'Pink', value: '#ec4899' },
];

export function PropertyManager({
  file,
  onUpdate,

}: PropertyManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);
  const [newPropertyName, setNewPropertyName] = useState('');
  const [newPropertyType, setNewPropertyType] =
    useState<CustomProperty['type']>('text');

  const handleAddProperty = () => {
    if (newPropertyName) {
      const newProperty: CustomProperty = {
        id: crypto.randomUUID(),
        name: newPropertyName,
        type: newPropertyType,
        value: '',
      };
      onUpdate({
        customProperties: [...file.customProperties, newProperty],
      });
      setNewPropertyName('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          Properties & Tags
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[90vh] max-w-2xl flex-col">
        <DialogHeader>
          <DialogTitle>Manage Properties & Tags</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="properties" className="mt-4 flex flex-1 flex-col">
          <TabsList>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[60vh] flex-1">
            <TabsContent value="properties" className="space-y-4 p-4">
              {/* Core Properties */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Core Properties</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-muted-foreground text-sm">
                      Case Number
                    </label>
                    <Input value={file.coreProperties.caseNumber} readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-muted-foreground text-sm">
                      Status
                    </label>
                    <Input value={file.coreProperties.status} readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-muted-foreground text-sm">
                      Author
                    </label>
                    <Input value={file.coreProperties.author} readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-muted-foreground text-sm">
                      Version
                    </label>
                    <Input value={file.coreProperties.version} readOnly />
                  </div>
                </div>
              </div>

              {/* Legal Properties */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Legal Properties</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-muted-foreground text-sm">
                      Document Type
                    </label>
                    <Input value={file.legalProperties.documentType} readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-muted-foreground text-sm">
                      Confidentiality
                    </label>
                    <Input
                      value={file.legalProperties.confidentiality}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-muted-foreground text-sm">
                      Case Stage
                    </label>
                    <Input value={file.legalProperties.caseStage} readOnly />
                  </div>
                  {file.legalProperties.jurisdiction && (
                    <div className="space-y-2">
                      <label className="text-muted-foreground text-sm">
                        Jurisdiction
                      </label>
                      <Input
                        value={file.legalProperties.jurisdiction}
                        readOnly
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Properties */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">Custom Properties</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddProperty}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Property
                  </Button>
                </div>
                <div className="space-y-4">
                  {file.customProperties.map((property) => (
                    <div key={property.id} className="flex items-center gap-4">
                      <Input
                        value={property.name}
                        className="flex-1"
                        placeholder="Property name"
                      />
                      <Select value={property.type}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="boolean">Yes/No</SelectItem>
                          <SelectItem value="select">Select</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
