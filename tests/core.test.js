import test from 'node:test';
import assert from 'node:assert/strict';
import {compareNames,daysBetween,leaseMonths,addDays,validLink} from '../dist/core.js';
test('PayNow comparison follows visible letters, wildcard and hidden suffix rules',()=>{
 assert.equal(compareNames('TaX MeX LiXX','Tan Mei Ling'),'match');
 assert.equal(compareNames(' WoX  KaX HoXX ','Tan Mei Ling'),'mismatch');
 assert.equal(compareNames('tAx mEX liXX','  TAN  MEI LING '),'match');
 assert.equal(compareNames('XXX XXX LXXX','Tan Mei Ling'),'few');
 assert.equal(compareNames('ACME PTE LTD','Acme Pte Ltd'),'manual');
 assert.equal(compareNames('TAN MEI','Tan Mei Ling'),'mismatch');
 assert.equal(compareNames('TAN MEI LIXX','Tan Mei Li'),'mismatch');
 assert.equal(compareNames('TAN MEI LIXX','Tan Mei Lington'),'mismatch');
 assert.equal(compareNames('TAN MEI LIXX','Tan Mei Lin'),'match');
 assert.equal(compareNames('TAN MEI LIXX','Tan Mei Lings'),'match');
 assert.equal(compareNames('陈 XX','陈美玲'),'manual');
 assert.equal(compareNames('','Tan Mei Ling'),'empty');
});
test('Lease durations and due dates include end date without timezone drift',()=>{
 assert.equal(leaseMonths('2027-08-01','2029-01-31'),18);
 assert.equal(leaseMonths('2027-08-01','2029-07-31'),24);
 assert.equal(leaseMonths('2027-08-01','2029-08-01'),25);
 assert.equal(daysBetween('2028-12-15','2029-01-31'),47);
 assert.equal(addDays('2029-01-31',14),'2029-02-14');
 assert.equal(addDays('2028-02-28',1),'2028-02-29');
});
test('Only absolute http(s) listing links accepted',()=>{
 assert.equal(validLink('https://example.com/room'),true);
 for(const link of ['javascript:alert(1)','file:///tmp/a','not a link','']) assert.equal(validLink(link),false);
});
