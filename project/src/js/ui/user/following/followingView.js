import router from '../../../router';
import { header } from '../../shared/common';
import { gameIcon } from '../../../utils';
import * as helper from '../../helper';
import layout from '../../layout';
import i18n from '../../../i18n';

export default function view(vnode) {
  const ctrl = vnode.state;

  return layout.free(
    header.bind(undefined, 'Following'),
    renderBody.bind(undefined, ctrl)
  );
}

function renderBody(ctrl) {
  if (ctrl.following().length) {
    return (
      <ul className="native_scroller page">
        {ctrl.following().map(p => renderPlayer(ctrl, p))}
      </ul>
    );
  } else {
    return (
      <div className="followingListEmpty">
        Oops! Nothing here.
      </div>
    );
  }
}

export function renderPlayer(ctrl, obj) {
  const status = obj.online ? 'online' : 'offline';
  const perfKey = obj.perfs && Object.keys(obj.perfs)[0];
  const perf = obj.perfs && obj.perfs[perfKey];
  const userLink = helper.ontapY(() => router.set(`/@/${obj.user}`));
  return (
    <li className="list_item followingList">
      <div className="followingPlayerTitle" oncreate={userLink}>
        <div className="user">
          <span className={'userStatus ' + status} data-icon="r" />
          {obj.title ? <span className="userTitle">{obj.title}&nbsp;</span> : null}
          {obj.user}
        </div>
        { perfKey ?
        <span className="rating" data-icon={gameIcon(perfKey)}>
          {perf.rating}
        </span> : null
        }
      </div>
      {obj.followable ?
        <div className="followingPlayerItem">
          <div className="check_container">
            <label htmlFor="user_following">{i18n('follow')}</label>
            <input id="user_following" type="checkbox" checked={obj.relation}
              onchange={() => ctrl.toggleFollowing(obj)} />
          </div>
        </div> : null
      }
      <div className="followingPlayerItem followingPlayerAction withIcon" data-icon="U"
        oncreate={helper.ontapY(() => ctrl.challenge(obj.user))}
      >
        {i18n('challengeToPlay')}
      </div>
    </li>
  );

}
