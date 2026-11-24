export function report(rows) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('Expected at least one sample record');
  rows=rows.map(row=>({...row}));
  for (const row of rows) {
    if (["id","category","amount"].some(k=>row[k]==null)) throw new Error('Missing required field');
    if (typeof row.amount==='string' && row.amount.trim()) row.amount=Number(row.amount);
    if (!Number.isFinite(row.amount)) throw new Error('Expected a numeric metric');
  }
  return {total:rows.reduce((s,r)=>s+r.amount,0),review:rows.filter(r=>r.amount>100).map(r=>r.category),ranked:rows.toSorted((a,b)=>b.amount-a.amount).map(r=>r.category)};
}
