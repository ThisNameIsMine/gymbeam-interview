// src/components/LoadingSpinner.tsx
import { ClipLoader } from "react-spinners";


export default function LoadingSpinner({ loading }: { loading?: boolean }) {

    return (
        <ClipLoader
            color="#ff4410"
            size={150}
            className="mx-auto my-20"
            loading={loading}
            aria-label="Loading Spinner"
        />
    );
}