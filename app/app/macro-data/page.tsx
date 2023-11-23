import MacroData from "@/components/pages/macro-data";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function App() {
    return (
        <Suspense
            fallback={
                <div className="w-full h-full flex justify-center items-center">
                    <Loader2 className="animate-spin" />
                </div>
            }
        >
            <MacroData />
        </Suspense>
    );
}
