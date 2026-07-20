
import OffSetPagination from "@/components/paginations/OffSetPagination";
import { Button } from "@/components/ui/button";
import connectDB from "@/lib/MongoDB";
import visaModel from "@/model/visa";
import Link from "next/link";
import SearchInput from "../../../components/admin/SearchInput";
import VisaTable from "@/components/admin/visa/VisaTable";

export default async function Pgae({ searchParams }) {
    await connectDB()
    const param = await searchParams
    const search = param.search || ''
    const page = Number(param.page) || 1
    console.log(search);
    const limit = 10
    const skip = (page - 1) * limit
    const query = search?{
        country :{
            $regex:search,
            $options: 'i'
        }
    } : {};
    
    const visas = await visaModel.find(query).skip(skip).limit(limit).lean()
    const plainVisa = JSON.parse(JSON.stringify(visas))
    const total = await visaModel.countDocuments(query)
    const totalPages = Math.ceil(total / limit)
    console.log('visa', visas);
    return (
        <>
            <section>
                <div>
                    <SearchInput/>
                    <Link href={`/admin/visa/addVisa`} >
                        <Button>+Add Visa </Button>
                    </Link>
                </div>

                <div className="p-5">

                   <VisaTable visas={plainVisa} />
                    {/* Pagination */}
                    <OffSetPagination basePath={'/admin/visa'} page={page} totalPage={totalPages} />

                    {/* <div className="flex gap-2 mt-6">

                        {page > 1 && (
                            <Link href={`/admin/visa?page=${page - 1}`}>
                                Prev
                            </Link>
                        )}

                        {Array.from({ length: totalPages }, (_, i) => (
                            <Link
                                key={i}
                                href={`/admin/visa?page=${i + 1}`}
                                className={
                                    page === i + 1
                                        ? "font-bold text-blue-600"
                                        : ""
                                }
                            >
                                {i + 1}
                            </Link>
                        ))}

                        {page < totalPages && (
                            <Link href={`/admin/visa?page=${page + 1}`}>
                                Next
                            </Link>
                        )}

                    </div> */}

                </div>
            </section>

            
        </>
    )

}