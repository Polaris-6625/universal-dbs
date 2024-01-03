import { Button, Table, Space, Modal, Input } from "antd";
import { useEffect, useState, useRef } from "react";
import InputsComponent from "./inputs";
import { SearchOutlined } from '@ant-design/icons';

function TableComponents(props) {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    let [dataSource, setDataSource] = useState();
    let [columns, setColums] = useState([]);
    const temp = [];
    const fetchData = async () => {
        fetch(`http://127.0.0.1:3000/getInfo/${props.data}`)
            .then((resp) => resp.json())
            .then((data) => {
                setColums([])
                const respJson = data.data;
                respJson.dataSource.map(((item, index) => {
                    item.key = index;
                }));
                const filtersArray = [];
                respJson.columns.map((item) => {
                    // item.key = item;
                    // item.dataIndex = item;
                    // item.title = item;
                    const arr = [];
                    for (let i = 0; i < respJson.dataSource.length; i++) {
                        arr.push({
                            text: respJson.dataSource[i][item],
                            value: respJson.dataSource[i][item]
                        });
                    }
                    temp.push({
                        key: item,
                        dataIndex: item,
                        title: item,
                        filters: arr,
                        onFilter: (value, record) => {
                            // console.log(record)
                            // console.log(record[item])
                            // console.log(value);
                            // console.log(record[item].indexOf(value))
                            return record[item] === value;
                        },
                        sortDirections: ['descend'],
                        // ...getColumnSearchProps(item)
                    })
                });
                dataSource = respJson.dataSource;
                columns = temp;
                console.log(columns)
                columns.push({
                    title: "操作",
                    render: (_, record) => (
                        <Space size="middle">
                            <Button danger onClick={() => {
                                const arr = Object.keys(record);
                                deleteValue(record[arr[0]], arr[0]);
                                fetchData();
                            }}>删除</Button>
                            <Button type="primary" onClick={() => {
                                setInputType("updata");
                                showModal();
                            }}>修改</Button>
                        </Space>
                    ),
                });
                setColums(columns);
                setDataSource(dataSource);
            })
    }
    useEffect(() => {
        fetchData()
    }, [props])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        fetchData();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const deleteValue = async (id, k) => {
        const data = JSON.stringify({
            [k]: id
        })
        const res = await fetch(`http://127.0.0.1:3000/delete/${props.data}/${id}`, {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    // let dataSource = [
    //     {
    //         key: '1',
    //         project_contract_number: '1',
    //         project_name: 'Project A',
    //         project_hours: 100,
    //         delivery_date: '2023-01-10',
    //         payment_terms: 'Net 30',
    //         proeject_amount: 5000000.00,
    //         manager_id: 1
    //     },
    //     {
    //         key: '2',
    //         project_contract_number: '2',
    //         project_name: 'Project B',
    //         project_hours: 200,
    //         delivery_date: '2023-01-10',
    //         payment_terms: 'Net 30',
    //         proeject_amount: 7500000.00,
    //         manager_id: 1
    //     },
    //     {
    //         key: '3',
    //         project_contract_number: '3',
    //         project_name: 'Project C',
    //         project_hours: 400,
    //         delivery_date: '2023-01-10',
    //         payment_terms: 'Net 30',
    //         proeject_amount: 13000000.00,
    //         manager_id: 1
    //     },
    // ]
    // const columns = [
    //     {
    //         title: 'project_contract_number',
    //         dataIndex: 'project_contract_number',
    //         key: 'project_contract_number',
    //     },
    //     {
    //         title: 'project_name',
    //         dataIndex: 'project_name',
    //         key: 'project_name',
    //     },
    //     {
    //         title: 'project_hours',
    //         dataIndex: 'project_hour',
    //         key: 'project_hour',
    //     },
    //     {
    //         title: 'delivery_date',
    //         dataIndex: 'delivery_date',
    //         key: 'delivery_date',
    //     },
    //     {
    //         title: 'payment_terms',
    //         dataIndex: 'payment_terms',
    //         key: 'payment_terms',
    //     },
    //     {
    //         title: 'proeject_amount',
    //         dataIndex: 'proeject_amount',
    //         key: 'proeject_amount',
    //     },
    //     {
    //         title: 'manager_id',
    //         dataIndex: 'manager_id',
    //         key: 'manager_id',
    //     },
    //     {
    //         title: '操作',
    //         dataIndex: "action",
    //         key: 'action',
    //         render: (_, record) => (
    //             <Space size="middle">
    //                 <Button danger onClick={() => {
    //                     deleteValue(record.key)
    //                 }}>删除</Button>
    //                 <Button type="primary" onClick={showModal}>修改</Button>
    //             </Space>
    //         ),
    //     }
    // ];
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    const [inputType, setInputType] = useState("add");
    const [searchValue,setSearchValue] = useState('');
    function changeValue(e) {
        setSearchValue(e.target.value);
    }
    function selectData() {
        const column = columns[0].title
        fetch(`http://127.0.0.1:3000/search/${props.data}/${column}/${searchValue}`)
        .then((resp) => resp.json())
        .then((data) => {
            setDataSource(data);
        })
    }
    return (
        <div data-testid="tableArea">
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <InputsComponent data={columns} tableName={props.data} type={inputType} />
            </Modal>
            <Table dataSource={dataSource} columns={columns} onChange={onChange} />
            <div style={{display: 'flex'}}>
                <Button onClick={() => {
                    setInputType("add");
                    showModal();
                }}>添加</Button>
                <div style={{ marginLeft: 'auto', display: 'flex' }}>
                    <Input placeholder="请输入id" value={searchValue} onChange={changeValue}></Input>
                    <Button type="primary" style={{ marginLeft: '100px' }} onClick={selectData}>查询</Button>
                </div>
            </div>
        </div>
    )
}
export default TableComponents;