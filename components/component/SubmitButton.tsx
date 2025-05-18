import { Button } from "@/components/ui/button";
import { SendIcon } from "./Icons";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
    const { pending, data, method, action } = useFormStatus();

    return (
        <Button variant="ghost" size="icon" disabled={pending}>
            <SendIcon className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Tweet</span>
        </Button>
    )
}
