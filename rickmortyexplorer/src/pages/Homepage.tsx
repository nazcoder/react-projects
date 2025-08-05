

import { getCharacterList } from '../api/queries';
import { useQuery } from '@tanstack/react-query';
import TanstackTable from "../components/TanstackTable";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { router } from '../routes';
import { pageRoutes } from '../routes';

function Homepage() {
  const navigate = useNavigate()
  const search = useSearch({ from: pageRoutes.homepage });
  const pageNo = parseInt(search.page) || 1;

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["characters", pageNo],
    queryFn: () => getCharacterList(pageNo),
    retryDelay: 1000,
    retry: 2
  })

  const handlePrevNextBtnClick = (page: number) => {
    navigate({
      to: pageRoutes.homepage,
      search: {
        page: page
      }
    });
  }

  const { results, info } = data || {};

  const refreshButtonText = isRefetching ? "Refreshing..." : "Refresh";

  const handleRowClick = (id: number) => {
    router.history.push(`/character-details/${id}`)
  }

  const renderPage = () => {
    if (error) return <p>Error: {error.message}</p>;
    if (isLoading) return <p>Loading...</p>;
    if (!results || results.length === 0) return <p>No characters found.</p>;
    else return <div>
      <TanstackTable data={results} handleRowClick={handleRowClick} />
      <div className="table-pagination-btn-container">
        <button disabled={!info?.prev} onClick={() => handlePrevNextBtnClick(pageNo - 1)}>Prev</button>
        <button disabled={!info?.next} onClick={() => handlePrevNextBtnClick(pageNo + 1)}>Next</button>
      </div>
    </div>
  }
  return (
    <>
      <h1 >Rick and Morty Explorer</h1>
      <button onClick={() => refetch()}
        disabled={isRefetching}
        className='refresh-btn'> {refreshButtonText}</button>

      {renderPage()}

    </>
  )
}

export default Homepage
