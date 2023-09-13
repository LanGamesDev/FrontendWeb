//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     

//core
import "primereact/resources/primereact.min.css";

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Word {
    id: string;
    content: string;
}

export default function WordsPage() {
    const [words, setWords] = useState<Word[]>([]);

    return (
        <div className="card">
            <DataTable value={words} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID"></Column>
                <Column field="content" header="Content"></Column>
            </DataTable>
        </div>
    );
}
  