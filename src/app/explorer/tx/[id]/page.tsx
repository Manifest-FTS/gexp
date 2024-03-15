'use client';

import Card, { SubTitle } from '@/components/common/Card';
import Chip from '@/components/common/Chip';
import TitleValue from '@/components/common/TitleValue';
import Loader from '@/components/ui/loader';
import { useTransactionDetails } from '@/hooks/useCoin';
import { formatDistanceToNow } from 'date-fns';
import { useMemo, useState } from 'react';
import ReactJson, { ReactJsonViewProps } from 'react-json-view';

type Props = {
  params: { id: string };
};

const defaultArgs = {
  args: undefined,
  chaincodeResponse: undefined,
  chaincode: undefined,
  reads: [],
  writes: [],
};

const JsonViewer = ({ src, collapsed = 1 }: ReactJsonViewProps) => (
  <div className="json-viewer-div">
    {src && <ReactJson src={src} theme="pop" collapsed={collapsed} />}
  </div>
);

const scrollTo = (id: string) => {
  var element = document.getElementById(id);
  if (!element) return;

  var offset = element.getBoundingClientRect().top;

  window.scrollTo({
    top: offset - 110,
    behavior: 'smooth',
  });
};

export default function TransactionDetailPage({ params }: Props) {
  const transactionId = params.id;
  const { data, isLoading } = useTransactionDetails(transactionId);
  const rawData = useMemo(() => data?.rawData, [data]);
  const [readAllVisible, setReadAllVisible] = useState(false);
  const [writeAllVisible, setWriteAllVisible] = useState(false);
  const { args, chaincodeResponse, chaincode, reads, writes } = useMemo(
    () => (rawData ? rawData.actions[0] : defaultArgs),
    [rawData],
  );

  const [method, argObj] = useMemo(
    () => (args ? [args[0], JSON.parse(args[1])] : []),
    [args],
  );

  return (
    <div>
      <div className="border-b pb-3 text-[20px]">
        <b>Transaction Details </b>
      </div>
      <div className="flex my-4 gap-2">
        {rawData?.id && (
          <Chip onClick={() => scrollTo('overview')}>Overview</Chip>
        )}
        {args && (
          <Chip onClick={() => scrollTo('action-0-details')}>
            Action 0 Details
          </Chip>
        )}
        {rawData && (
          <Chip onClick={() => scrollTo('transaction-data')}>
            Transaction Data
          </Chip>
        )}
      </div>
      {rawData?.id && data && (
        <div>
          <Card id="overview" title="Overview">
            <TitleValue
              title="Transaction Hash :"
              boxClassName="max-lg:flex-col"
            >
              {rawData.id}
            </TitleValue>
            <TitleValue title="Type :">{rawData.type}</TitleValue>
            {data.blockNumber && data.channelId && (
              <TitleValue title="Block :">
                <a
                  href={`/explorer/blocks/${data.blockNumber}?channel=${data.channelId}`}
                  className="text-blue-600 hover:underline"
                >
                  #{data.blockNumber}
                </a>
              </TitleValue>
            )}
            <TitleValue title="Timestamp :">
              {formatDistanceToNow(new Date(data.createdAt))} (
              {new Date(data.createdAt).toISOString()})
            </TitleValue>

            <TitleValue title="Method :">{method}</TitleValue>

            {argObj?.owner && (
              <TitleValue title="Owner :">{argObj.owner}</TitleValue>
            )}
            {argObj?.from && (
              <TitleValue title="From :">{argObj.from}</TitleValue>
            )}
            {argObj?.to && <TitleValue title="To :">{argObj.to}</TitleValue>}
          </Card>
          <Card id="action-0-details" title="Action 0 Details">
            <TitleValue title="Proposal Argument 0">{method}</TitleValue>
            <TitleValue title="Proposal Argument 1">
              <JsonViewer src={argObj} />
            </TitleValue>
            <hr className="my-4 bg-gray-900" />
            <SubTitle title="Proposal Response" />
            <TitleValue title="Status">
              {chaincodeResponse?.status || '--'}
            </TitleValue>
            <TitleValue title="Message">
              {chaincodeResponse?.message || '--'}
            </TitleValue>
            {chaincodeResponse?.payload && (
              <TitleValue title="Response">
                <JsonViewer src={JSON.parse(chaincodeResponse.payload)} />
              </TitleValue>
            )}
            <hr className="my-4 bg-gray-900" />
            <SubTitle title="Chaincode details" />
            <TitleValue title="Chaincode name">
              {chaincode?.name || '--'}
            </TitleValue>
            <TitleValue title="Chancode version">
              {chaincode?.version || '--'}
            </TitleValue>
            <hr className="my-4 bg-gray-900" />
            <SubTitle title="Reads and Writes" />
            {reads
              .slice(0, readAllVisible ? reads.length : 6)
              .map(({ key }, index) => (
                <TitleValue title={`Read ${index}`}>
                  {index === 0 ? '_lifecycle' : chaincode?.name}::{key}
                </TitleValue>
              ))}
            {reads.length > 6 && (
              <div
                className="bg-brand p-2 rounded-xl max-w-[150px] text-center mx-auto mb-5 mt-2 cursor-pointer text-white"
                onClick={() => setReadAllVisible((e) => !e)}
              >
                {readAllVisible ? 'Show Less' : 'Show All'}
              </div>
            )}
            {writes
              .slice(0, writeAllVisible ? writes.length : 6)
              .map(({ key, value }, index) => (
                <>
                  <TitleValue title={`Write ${index} key`}>
                    {chaincode?.name}::{key}
                  </TitleValue>
                  <TitleValue title={`Write ${index} value`}>
                    {value && (
                      <JsonViewer src={JSON.parse(value)} collapsed={0} />
                    )}
                  </TitleValue>
                </>
              ))}
            {writes.length > 6 && (
              <div
                className="bg-brand p-2 rounded-xl max-w-[150px] text-center mx-auto mb-5 mt-2 cursor-pointer text-white"
                onClick={() => setWriteAllVisible((e) => !e)}
              >
                {writeAllVisible ? 'Show Less' : 'Show All'}
              </div>
            )}
          </Card>
          <Card id="transaction-data" title="Transaction Data">
            <JsonViewer src={rawData} />
          </Card>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center mt-3">
          <Loader />
        </div>
      )}
    </div>
  );
}
