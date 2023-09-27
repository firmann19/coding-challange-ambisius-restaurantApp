"use client";

import { Table, TableBody } from "@/components/ui/table";
import { FC, useState } from "react";

interface DapurFormProps {

}

const DapurForm: FC<DapurFormProps> = ({ }) => {
    const [editorLoaded, setEditorLoaded] = useState<boolean>(false);

    return (
        <>
        <div className="flex gap-16">
            <p className='text-2xl font-bold'>Meja 1</p>
            <p className='text-2xl font-bold'>Meja 2</p>
            <p className='text-2xl font-bold'>Meja 3</p>
        </div>
        <div className="mt-5">
        <Table>
            <TableBody>
                <div className="mt-5">
                <p className="font-semibold">Daftar Menu Restoran</p>
                </div>
            </TableBody>
        </Table>
    </div>
    </>
    );
};

export default DapurForm;