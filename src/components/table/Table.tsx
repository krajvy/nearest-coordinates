import styled from 'styled-components';

export type TableProps = {
  heading?: string[];
  data: (string | number)[][];
};

const StyledTable = styled.table`
  width: 100%;
`;

const StyledTdNumber = styled.td`
  text-align: right;
`;

const StyledTdText = styled.td`
  text-align: left;
`;

const Table = ({ className, heading, data }: TableProps & { className?: string }) => {
    return (
        <StyledTable className={className}>
          {heading && (
            <thead>
              <tr>
                {heading.map((head, index) => (
                  <th key={index}>{head}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  typeof cell === 'number' ? (
                    <StyledTdNumber key={cellIndex}>{cell}</StyledTdNumber>
                  ) : (
                    <StyledTdText key={cellIndex}>{cell}</StyledTdText>
                  )
                ))}
              </tr>
            ))}
          </tbody>
        </StyledTable>
    );
};

export default Table;
