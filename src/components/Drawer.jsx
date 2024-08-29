import FormAction from "./FormAction";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CirclePlus } from "lucide-react";

import { useState } from "react";

const DrawerComponent = ({getOperations}) => {
  const [open, setOpen] = useState(false)
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Operation <CirclePlus className="ml-2" /> </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto sm:w-1/3">
          <DrawerHeader>
            <DrawerTitle>Movements</DrawerTitle>
            <DrawerDescription>Income and expenses</DrawerDescription>
          </DrawerHeader>
          <FormAction setOpen={setOpen} getOperations={getOperations} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
