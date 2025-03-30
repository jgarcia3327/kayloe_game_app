export default function Table({ auth, items, columns, primary, action }:any) {
    return (
        <div className="relative overflow-x-auto border shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">{primary}</th>
                    {columns.map((column:any) =>
                        <th key={column} scope="col" className="px-6 py-3">{column}</th>
                    )}
                    <th scope="col" className="px-6 py-3"></th>
                </tr>
                </thead>
                <tbody>
                {items.map((item:any) =>
                    <tr key={item.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            #{item.id}
                        </th>
                        {columns.map((column:any) =>
                            <td key={column} className="px-6 py-4">
                                {item[column]}
                            </td>
                        )}
                        {auth.user.id === item.user_id? 
                        <>
                            <td className="px-6 py-4">
                            <a href={route(action, item.id).toString()} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                        </> : <></>}
                        
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
