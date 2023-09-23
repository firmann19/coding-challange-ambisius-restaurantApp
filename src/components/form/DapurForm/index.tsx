"use client";

import { FC, useState } from "react";

interface DapurFormProps {

}

const DapurForm: FC<DapurFormProps> = ({ }) => {
    const [editorLoaded, setEditorLoaded] = useState<boolean>(false);

    return (
        <div className="flex gap-16">
            <p className='text-2xl font-bold'>Meja 1</p>
            <p className='text-2xl font-bold'>Meja 2</p>
            <p className='text-2xl font-bold'>Meja 3</p>
        </div>
    );
};

export default DapurForm;