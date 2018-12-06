import dva from 'dva';
import './styles/common.css';
//解决移动端点击300ms延迟
var FastClick = require('fastclick');
FastClick.attach(document.body);

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/index').default);
app.model(require('./models/discover').default);
app.model(require('./models/play').default);


// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
