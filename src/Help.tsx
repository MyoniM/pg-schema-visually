import BasicNavbar from './components/basicNavbar';

import ref from './assets/ref.png';
import refex from './assets/refex.png';
import example from './assets/example.png';

export default function Help() {
  return (
    <div style={{height: "calc(100vh)",overflow: "auto"}}>
      <BasicNavbar />
      <div className="help">
        <h1>This is a simple how to guide to use this app</h1>
        <h4>
          Every table should start with the <span className="help-tag">TABLE</span> key word. <span className="help-tag">No</span> other column or
          type should have the same value.
        </h4>
        <h2>How to reference a table</h2>
        <h4>For now only creating a reference is allowed. Support for reference type coming soon.</h4>
        <img src={ref} alt="ref example" />
        <br />
        <h4>To reference a table, create the appropriate column in the current table and add a third value after specifying the column type.</h4>
        <h4>
          The third value has a type of <span className="help-tag">array []</span>. Inside the array there are three main parts. The{' '}
          <span className="help-tag">ref:</span> <span className="help-tag">referencedTableName</span>{' '}
          <span className="help-tag">referencedTableCol</span>.
        </h4>
        <h4>
          The <span className="help-tag">ref:</span> tells what type of property it is. After <span className="help-tag">ref:</span> add a white space
          (must) and write the <span className="help-tag">referencedTableName</span> and immediately after that(no white space) add a{' '}
          <span className="help-tag">referencedTableCol</span>.{' '}
        </h4>
        <h4>If you follow this step correctly, you should have a card like below</h4>
        <img src={refex} alt="ref example" />
        <h4>
          users' table id column will have a <span className="help-tag">x1</span> value because it is referenced once and if you check the Highlight
          option you will see <span className="help-tag">user_id</span> column of comments table also highlight because it referenced from users
          table.
        </h4>
        <h2>Here is an example</h2>
        <img src={example} width="100%" alt="full example" />
        <h6 style={{ textAlign: 'center' }}>Made by Yonatan Merkebu</h6>
      </div>
    </div>
  );
}
